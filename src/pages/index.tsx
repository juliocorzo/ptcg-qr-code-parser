import QRCode from "react-qr-code"
import { Box, Button, Card, Container, Stack, TextField, Typography, Grid2 as Grid, CardMedia, CardContent, CardHeader } from "@mui/material"
import { useState } from "react"
import { useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function Home() {
  const [codeString, setCodeString] = useState("")
  const [codes, setCodes] = useState<string[]>([])
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
  const { breakpoints } = useTheme()

  const isMobile = useMediaQuery(breakpoints.down("md"))

  console.log(codeString);
  console.log(codes);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const rawCodes = value.split("\n");
    const codes = rawCodes.filter(code => code.trim() !== "" && code.length === 16 && code.split("-").length === 4);
    setCodeString(value);
    setCodes(codes);
  }

  const handleClear = () => {
    setCodeString("");
    setCodes([]);
    setCurrentCodeIndex(0);
  }

  return (
    <>
      <Container>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginTop: 4,
            marginBottom: 3
          }}
        >
          Pokemon TCG Live Code Parser
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            marginBottom: { xs: 4, md: 8 }
          }}
        >
          Paste your codes in the text area below. Each code must be on a new line and have a length of 16 characters.
        </Typography>
        <Grid container spacing={4} justifyContent={"center"}>
          <Grid size={{ xs: 12, md: 6 }}>

            <TextField 
              label="QR Code List"
              sx={{ 
                width: "100%",
                marginBottom: 4
              }}
              multiline
              value={codeString}
              onChange={handleInputChange}
              rows={isMobile ? 10 : 20}
            />
            {codes.length > 0 && (
            <>
              <Stack direction="row" justifyContent={"center"} spacing={2} marginTop={2}>
              <Button
                  variant="contained"
                  color="warning"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCurrentCodeIndex(currentCodeIndex - 1)}
                  disabled={currentCodeIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => setCurrentCodeIndex(currentCodeIndex + 1)}
                  disabled={currentCodeIndex === codes.length - 1}
                >
                  Next
                </Button>
              </Stack>
              </>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ marginTop: { xs: 4, md: 0 } }}>
          <Box>
          {codes.length > 0 && (
            <>
              <Box sx={{ textAlign: "center", marginTop: { sm: 4, md: 0 } }}>
                {/* <Typography variant="h3" sx={{ marginBottom: 8 }}>{codes[currentCodeIndex]}</Typography> */}
                <QRCode size={500} value={codes[currentCodeIndex]} level="H" />
                <Typography 
                  variant="h5"
                  sx={{ marginTop: 4 }}
                  fontFamily={"monospace"}
                >
                  {codes[currentCodeIndex]}
                </Typography>
              </Box>
            </>
          )}
        </Box>
        </Grid>
        </Grid>
      </Container>
    </>
  );
}

