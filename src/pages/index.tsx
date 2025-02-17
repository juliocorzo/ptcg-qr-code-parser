import QRCode from "react-qr-code"
import { Box, Button, Container, Stack, TextField, Typography, Grid2 as Grid, IconButton } from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AboutModal } from "@/components/about-modal"

export default function Home() {
  const [codeString, setCodeString] = useState("")
  const [codes, setCodes] = useState<string[]>([])
  const [errorLines, setErrorLines] = useState<string[]>([])
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
  const { breakpoints } = useTheme()

  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const prevButtonRef = useRef<HTMLButtonElement>(null)

  const isMobile = useMediaQuery(breakpoints.down("md"))

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const rawCodes = value.split("\n");
    const codes = rawCodes.filter(code => code.trim() !== "" && code.length === 16 && code.split("-").length === 4);
    const linesWithErrors = rawCodes.filter(code => code.trim() !== "" && code.length !== 16 || code.split("-").length !== 4 && code !== "");
    setErrorLines(linesWithErrors);
    setCodeString(value);
    setCodes(codes);
  }

  const handleClear = () => {
    setCodeString("");
    setCodes([]);
    setCurrentCodeIndex(0);
  }

  useEffect(() => {
    const handleNextKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        if (currentCodeIndex < codes.length - 1) {
          nextButtonRef.current?.focus();
          // nextButtonRef.current?.click();
          setCurrentCodeIndex((prevIndex) => Math.min(prevIndex + 1, codes.length - 1));
        }
      }
      if (event.key === "ArrowLeft") {
        if (currentCodeIndex > 0) {
          prevButtonRef.current?.focus();
          // prevButtonRef.current?.click();
          setCurrentCodeIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
      }
    }
    window.addEventListener("keydown", handleNextKeydown);
    return () => {
      window.removeEventListener("keydown", handleNextKeydown);
    }
  }, [codes, currentCodeIndex]);

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginTop: 4,
          }}
        >
          QR Code Generator
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            marginBottom: 3
          }}
          color="textSecondary"
        >
          For Pokemon TCG Live Code Cards
        </Typography>
        <AboutModal />
        <Grid container spacing={4} justifyContent={"center"} marginTop={8}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField 
              label="QR Code List"
              sx={{ 
                width: "100%",
                marginBottom: 4
              }}
              multiline
              value={codeString}
              onChange={handleInputChange}
              rows={isMobile ? 2 : 20}
              error={errorLines.length > 0}
              helperText={
                errorLines.length > 0 
                  ? `Each line must have the following format: XXX-XXXX-XXX-XXX. Lines with errors: ${errorLines.join(", ")}`
                  : "Each line must have the following format: XXX-XXXX-XXX-XXX"
                }
            />
            {/* Mobile QR Code */}
            {codes.length > 0 && isMobile && (
            <>
              <Box sx={{ textAlign: "center", marginTop: { sm: 4, md: 0 }, marginBottom: 4 }}>
                {/* <Typography variant="h3" sx={{ marginBottom: 8 }}>{codes[currentCodeIndex]}</Typography> */}
                <QRCode size={isMobile ? 350 : 500} value={codes[currentCodeIndex]} level="H" />
                <Typography 
                  variant="h5"
                  sx={{ marginTop: 4 }}
                  fontFamily={"monospace"}
                >
                  {codes[currentCodeIndex]}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
                {`${currentCodeIndex + 1} of ${codes.length}`}
              </Typography>
              </Box>
            </>
          )}
            {codes.length > 0 && (
            <>
              <Stack direction="row" justifyContent={"center"} spacing={2} >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClear}
                  // startIcon={<ClearIcon />}
                  sx={{ width: "20%" }}
                >
                  Clear
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setCurrentCodeIndex(currentCodeIndex - 1)}
                  disabled={currentCodeIndex === 0}
                  ref={prevButtonRef}
                  sx={{ width: "20%", padding: 0 }}
                >
                  Prev.
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => setCurrentCodeIndex(currentCodeIndex + 1)}
                  disabled={currentCodeIndex === codes.length - 1}
                  ref={nextButtonRef}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ width: "60%" }}
                >
                  Next
                </Button>
              </Stack>
              </>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ marginTop: { xs: 4, md: 0 } }}>
          <Box>
          {/* Desktop QR code */}
          {codes.length > 0 && !isMobile && (
            <>
              <Box sx={{ textAlign: "center", marginTop: { sm: 4, md: 0 } }}>
                {/* <Typography variant="h3" sx={{ marginBottom: 8 }}>{codes[currentCodeIndex]}</Typography> */}
                <QRCode size={isMobile ? 350 : 500} value={codes[currentCodeIndex]} level="H" />
                <Typography 
                  variant="h5"
                  sx={{ marginTop: 4 }}
                  fontFamily={"monospace"}
                >
                  {codes[currentCodeIndex]}
                </Typography>
                <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
                {`${currentCodeIndex + 1} of ${codes.length}`}
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

