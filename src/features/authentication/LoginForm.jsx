import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function LoginForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { login, isLoginIn } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "evil-corporaty@yandex.ru",
      password: "123789",
    },
  });

  const onSubmit = (user) =>
    login(user, {
      onError: () => reset({ email: "", password: "" }),
    });
  // const onSubmit = (user) => console.log(user);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors.username}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          disabled={isLoginIn}
          // defaultValue={email}
          // onChange={(e) => setEmail(e.target.value)}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              message: "Incorrect email",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors.password}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoginIn}
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password should contain at least 6 characters",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{!isLoginIn ? "Log in" : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
