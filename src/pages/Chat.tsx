import AIChat from "@/components/AIChat";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto py-12 h-full">
      <h1 className="text-2xl font-bold mb-6">Financial Assistant</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Ask questions about loans, budgeting, savings, or entrepreneurship. Our AI agent
        will provide clear financial education and guidance. All exchanges are saved so you
        can review them later or share them with our support team for follow‑up.
      </p>
      {user ? (
        <div className="h-[500px]">
          <AIChat />
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="mb-4">You need to be logged in to use the chatbot.</p>
          <Link to="/signin" className="text-primary underline">
            Sign in
          </Link>{" "}
          or
          <Link to="/register" className="text-primary underline">
            {' '}register</Link> to continue.
        </div>
      )}
    </div>
  );
};

export default ChatPage;
