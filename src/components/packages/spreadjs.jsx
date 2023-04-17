import { useState, useEffect, useRef } from "react";
import { SpreadSheets } from "@grapecity/spread-sheets-react";
import { IO } from "@grapecity/spread-excelio";
import { saveAs } from "file-saver";
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import { Button, Input } from "@mui/material";

export default function Spreadjs() {
  const [spread, setSpread] = useState();

  const fileNameRef = useRef(null);
  const pwRef = useRef(null);

  const excelIo = new IO();

  const init = (spread) => {
    setSpread(spread);

    const array = [
      ["Tree", "Height", "Age", "Yield", "Profit", "Height"],
      ["=App?e", ">10", null, null, null, "<16"],
      ["=P*"],
      ["Tree", "Height", "Age", "Yield", "Profit"],
      ["Apple", 18, 20, 14, 105],
      ["Pear", 12, 12, 10, 96],
      ["Cherry", 13, 14, 9, 105],
      ["AppLe", 14, 15, 10, 75],
      ["Pear", 9, 8, 8, 76.8],
      ["Apple", 8, 9, 6, 45],
    ];

    const sheet = spread.getSheet(0);
    sheet.setArray(0, 0, array);

    const arr2 = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ];

    //sheet.setArray(10, 7, arr2);
    sheet.setArrayFormula(10, 7, 3, 3, "=SUM(B5:C5)");
  };

  const uploadExcel = (e) => {
    const excelFile = e.target.files[0];

    excelIo.open(excelFile, (json) => {
      spread.fromJSON(json);
    });
  };

  const saveExcel = (e) => {
    const json = spread.toJSON();

    const fileName =
      fileNameRef.current.value === ""
        ? "defaultExport.xlsx"
        : fileNameRef.current.value + ".xlsx";

    excelIo.save(
      json,
      (blob) => {
        saveAs(blob, fileName);
      },
      (error) => {
        console.log(error);
      },
      { password: pwRef.current.value }
    );

    pwRef.current.value = "";
    fileNameRef.current.value = "";
  };

  return (
    <div className="App">
      <SpreadSheets
        hostStyle={{ width: "100%", height: 600 }}
        workbookInitialized={(spread) => init(spread)}
      ></SpreadSheets>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          gap: 10,
        }}
      >
        <Input type="file" onChange={(e) => uploadExcel(e)} />
        <Input
          type="text"
          placeholder="파일명을 입력해주세요"
          ref={fileNameRef}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          ref={pwRef}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => saveExcel(e)}
        >
          excel 저장
        </Button>
        {/* <Button onClick={savePDF}>pdf 저장</Button> */}
      </div>
    </div>
  );
}
