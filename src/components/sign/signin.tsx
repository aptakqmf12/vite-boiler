import { useState, useEffect, useRef } from "react";
import { Button, Input, Grid, AppBar } from "@mui/material";
import { emailRule, passwordRule } from "../../lib/inputRule";

export default function Signin() {
  return (
    <Grid container gap={1} width={500}>
      <Grid item xl={12}>
        <ValidationInput
          rule={emailRule}
          type="text"
          placeholder="이메일을 입력해주세요"
        />
      </Grid>

      <Grid item xl={12}>
        <ValidationInput
          rule={passwordRule}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </Grid>

      <Grid item xl={12}>
        <Button variant="outlined">로그인</Button>
      </Grid>
    </Grid>
  );
}

interface ValidationInputProps {
  rule: (v: string) => boolean;
  type: string;
  placeholder?: string;
}
const ValidationInput = ({ rule, type, placeholder }: ValidationInputProps) => {
  const [value, setValue] = useState("");
  const [validation, setValidation] = useState<boolean | undefined>();

  const border =
    validation === true
      ? "1px blue solid"
      : validation === false
      ? "1px red solid"
      : "1px black solid";

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setValidation(rule(value))}
      style={{ border }}
      placeholder={placeholder}
      type={type}
    />
  );
};
