import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/stores/auth.store";

const formSchema = z
  .object({

    email: z.string().email(),
    password: z.string().min(1, { message: "Şifre Zorunludur" }),

  })


const LoginPage = () => {
  const navigate = useNavigate();

  const { login, isLoading, message, isAuthenticated } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await login(data.email, data.password);
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex w-full  flex-col items-center justify-center min-h-[90vh] p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="p-6 md:p-8"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">
                        Hadi Giriş Yapalım!
                      </h1>
                      <p className="text-muted-foreground text-balance">
                        Email ve şifrenizi girin
                      </p>
                    </div>



                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="m.example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Şifre</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>


                    {!!message && (
                      <Alert className="bg-destructive/10 border-none">
                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                        <AlertTitle>{message}</AlertTitle>
                      </Alert>
                    )}

                    <Button disabled={isLoading} type="submit" className="w-full">
                      Giriş Yap
                    </Button>

                    <div
                      className="after:border-border relative text-center text-sm after:absolute
                  after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                    >
                    </div>

                    <div className="text-center text-sm">
                      Bir Hesabınız yok mu?{" "}
                      <Link
                        to="/register"
                        className="underline underline-offset-4"
                      >
                        Üye Ol
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
