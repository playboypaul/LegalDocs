import Header from "@/components/header";
import Footer from "@/components/footer";
import LegalDraftingWizard from "@/components/legal-drafting-wizard";
import { templates } from "@/lib/templates";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <LegalDraftingWizard templates={templates} />
      </main>
      <Footer />
    </div>
  );
}
