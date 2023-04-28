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
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { emailRule, passwordRule } from "../../lib/inputRule";
import { requestLogin } from "../../api/sign";
// import styled from "styled-components";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "@store/login";
import { generatePhoneNumber } from "@lib/inputRule";
import { ResponseCode } from "../../types/index";

export default function Signin() {
  const { isLogin, setLogin } = useLoginStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem("id") || "");
  const [emailValid, setEmailValid] = useState<boolean>();
  const [password, setPassword] = useState(localStorage.getItem("pw") || "");
  const [passwordValid, setPasswordValid] = useState<boolean>();
  const [phoneNum, setPhoneNum] = useState<string>("");

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    requestLogin({ username: email, password: password })
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        setLogin(true);

        if (!remember) return;
        localStorage.setItem("id", email);
        localStorage.setItem("pw", password);
      })
      .catch((error) => {
        if (error.response.data.message === ResponseCode.INVALID_CREDENTIALS) {
          setOpenDialog(true);
          setDialogText("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else if (
          error.response.data.message === ResponseCode.INVALID_REQUEST
        ) {
          setOpenDialog(true);
          setDialogText("아이디 비밀번호를 입력해주세요");
        }
      });
  };

  const handleChange = (e: ChangeEvent<any>) => {
    const generatedNum = generatePhoneNumber(e.target.value);
    setPhoneNum(generatedNum);
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        style={{ border: "1px red solid" }}
      >
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

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              // onBlur={(e) => setEmailValid(emailRule(email))}
              error={emailValid === false}
              helperText={
                emailValid === false ? "이메일 형식에 맞게 입력" : null
              }
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
              // onBlur={(e) => setPasswordValid(passwordRule(password))}
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
              control={
                <Checkbox
                  value={remember}
                  onChange={() => setRemember(!remember)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 0 }}
            >
              로그인
            </Button>
          </Box>
        </Box>

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => navigate("/signup")}
        >
          회원가입
        </Button>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>로그인 실패</DialogTitle>
        <DialogContent>{dialogText}</DialogContent>

        <Button onClick={() => setOpenDialog(false)}>확인</Button>
      </Dialog>
    </>
  );
}
