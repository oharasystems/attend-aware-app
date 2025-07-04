import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { UserRole } from "@/types";

const Index = () => {
  // Mock current user - in real app this would come from auth context
  const [currentUser] = useState({
    role: 'admin' as UserRole,
    name: 'Sarah Johnson'
  });

  return (
    <Layout userRole={currentUser.role} userName={currentUser.name}>
      <Dashboard userRole={currentUser.role} />
    </Layout>
  );
};

export default Index;
