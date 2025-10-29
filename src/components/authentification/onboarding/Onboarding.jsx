import { useState } from "react";
import StepStructure from "./StepStructure";
import StepGroups from "./StepGroups";
import StepTeamInvite from "./StepTeamInvite";
import { createOrganisation, createGroups, inviteMembers } from "../../../services/onboardingAPI";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [nom, setNom] = useState("");
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const { utilisateur, loading } = useAuth();

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const finishOnboarding = async () => {
    try {
      const { data: orgData } = await createOrganisation({ nom });
      const orgId = orgData.organisation._id;

      const groupsWithOrg = groups.map((g) => ({
        nom: g.name,
        parent_id: null,
        organisation_id: orgId,
      }));
      await createGroups(groupsWithOrg);

      const membersWithOrg = members.map((m) => ({
        email: m.email,
        role: m.role,
        groupe_interne_id: null,
        organisation_id: orgId,
      }));
      await inviteMembers(membersWithOrg);

      toast.success("Onboarding terminé !");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erreur lors de l'onboarding");
    }
  };

  // 👇 Important : attendre la fin du chargement avant de vérifier l'utilisateur
  if (loading) {
    return <p>Chargement en cours…</p>;
  }

  if (!utilisateur) {
    return <p>Vous devez être connecté pour accéder à l'onboarding.</p>;
  }

  return (
    <>
      {step === 1 && (
        <StepStructure
          structureName={nom}
          setStructureName={setNom}
          onNext={next}
        />
      )}
      {step === 2 && (
        <StepGroups
          groups={groups}
          setGroups={setGroups}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 3 && (
        <StepTeamInvite
          members={members}
          setMembers={setMembers}
          onBack={back}
          onFinish={finishOnboarding}
        />
      )}
    </>
  );
}
