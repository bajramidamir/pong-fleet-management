interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
}
