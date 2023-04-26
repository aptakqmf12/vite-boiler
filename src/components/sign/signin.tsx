import { useState, useEffect, useRef, ChangeEvent } from "react";
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
import { requestLogin, testApi } from "../../api/sign";
// import styled from "styled-components";
import { styled } from "@mui/system";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState<boolean>();
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState<boolean>();
  const [phoneNum, setPhoneNum] = useState<string>("");

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

  const handleChange = (e: ChangeEvent<any>) => {
    let value = e.target.value;
    value = value.replace(/-/g, "");
    const { length } = value;

    if (length < 4) {
      value = value;
    } else if (length < 7) {
      value = value.substr(0, 3) + "-" + value.substr(3);
    } else if (length < 11) {
      value =
        value.substr(0, 3) + "-" + value.substr(3, 3) + "-" + value.substr(6);
    } else {
      value =
        value.substr(0, 3) + "-" + value.substr(3, 4) + "-" + value.substr(7);
    }

    setPhoneNum(value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmailValid(emailRule(email))}
            error={emailValid === false}
            helperText={emailValid === false ? "이메일 형식에 맞게 입력" : null}
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
            onBlur={(e) => setPasswordValid(passwordRule(password))}
            error={passwordValid === false}
            helperText={
              passwordValid === false
                ? "영문, 숫자, 특수기호(!,@,#,$,%) 모두 포함하여 8~15자리"
                : null
            }
          />
          <TextField
            margin="normal"
            label="phone number"
            variant="outlined"
            fullWidth
            value={phoneNum}
            onChange={handleChange}
            placeholder="000-0000-0000"
            inputProps={{ maxLength: 13, pattern: "\\d{3}-\\d{3,4}-\\d{4}" }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        onClick={testApi}
      >
        Test
      </Button>
    </Container>
  );
}

const TestButton = styled("button")(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
