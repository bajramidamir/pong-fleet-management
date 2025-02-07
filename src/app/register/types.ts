interface UserFormData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterFormProps {
  formData: UserFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<Element>) => Promise<void>;
}
