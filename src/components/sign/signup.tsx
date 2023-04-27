import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Stepper,
  Step,
  StepLabel,
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

// import styled from "styled-components";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "@store/login";

export default function SignUp() {
  const { isLogin, setLogin } = useLoginStore();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const MAX_STEP = 3;

  const FIXED_STEPS = [
    {
      step: 0,
      title: "약관동의",
      component: <div>약관동의</div>,
    },
    {
      step: 1,
      title: "정보입력",
      component: <div>정보입력</div>,
    },
    {
      step: 2,
      title: "가입완료",
      component: <div>가입완료</div>,
    },
  ];

  const handleNext = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };
  const handleSignUp = () => {
    alert("회원가입 완료");
    navigate("/signin");
  };

  return (
    <>
      <Container>
        <Box>Riskzero 3.0</Box>
        <Box>회원가입</Box>

        <Stepper activeStep={currentStep} alternativeLabel>
          {FIXED_STEPS.map((step, i) => (
            <Step key={i}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {FIXED_STEPS.find((step) => step.step === currentStep)?.component}
        </div>

        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={1} md={1}>
            <Button
              fullWidth
              onClick={handleNext}
              disabled={currentStep === MAX_STEP - 1}
            >
              다음
            </Button>
          </Grid>

          <Grid item xs={1} md={1}>
            <Button
              fullWidth
              onClick={handleSignUp}
              disabled={currentStep !== MAX_STEP - 1}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
