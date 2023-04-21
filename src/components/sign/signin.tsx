import { useState, useEffect, useRef } from "react";
import {
  FormControl,
  Button,
  Input,
  Grid,
  AppBar,
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  CssBaseline,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { emailRule, passwordRule } from "../../lib/inputRule";
import { requestLogin } from "../../api/sign";
import { Copyright } from "@mui/icons-material";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean>();
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState<boolean>();

  const generateBorder = (valid: boolean | undefined) => {
    return valid === true
      ? "1px blue solid"
      : valid === false
      ? "1px red solid"
      : "1px black solid";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    requestLogin({ username: "admin", password: "riskzero1231" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>

    // <FormControl variant="standard" size="medium" margin="normal" required>
    //   <Input
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     onBlur={() => setEmailValid(emailRule(email))}
    //     style={{
    //       border: generateBorder(emailValid),
    //     }}
    //     placeholder={"이메일을 입력해주세요"}
    //     type={"text"}
    //   />

    //   <Input
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     onBlur={() => setPasswordValid(passwordRule(password))}
    //     style={{
    //       border: generateBorder(passwordValid),
    //     }}
    //     placeholder={"비밀번호를 입력해주세요"}
    //     type={"password"}
    //   />

    //   <Button
    //     variant="outlined"
    //     onClick={() => requestLogin({ username: email, password: password })}
    //   >
    //     로그인
    //   </Button>
    // </FormControl>
  );
}
