import { Box, Button, Modal, Typography, Card, CardHeader, CardContent, CardActions } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from "react";
import Link from "next/link";

function AboutModal() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Button 
        onClick={() => setOpen(true)}
        size="small" 
        color="info"
        startIcon={<ArticleIcon />}
        variant="contained"
        sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}
      >
        About
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // width: { xs: "90%", md: 400 },
            width: { xs: "90%", md: 'unset' },
            p: 4,
          }}
        >
          <CardHeader title="About" />
          <CardContent>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              This is a simple QR code generator that allows users to generate QR codes for the Pokemon TCG Live.
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              This is particularly useful for players who purchased codes on stores like TCGPlayer and want an easy way to redeem them on <Link href="https://pokemon.com/redeem">code redemption site</Link> using their phone.
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              This project is open source, and records no codes or user data. 
              It uses <Link href="https://www.npmjs.com/package/react-qr-code">react-qr-code</Link> to generate the QR codes.
              Please let me know if you have any questions or suggestions.
            </Typography>
            <CardActions disableSpacing>
              <Button 
                startIcon={<GitHubIcon />}
                variant="contained"
                size="small" 
                color="primary" 
                href="https://github.com/juliocorzo/ptcg-qr-code-parser"
              >
                  Source code
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Modal>
    </Box>

  )
}

export { AboutModal };