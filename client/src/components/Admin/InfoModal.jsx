import React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 130,
  bgcolor: "#eee",
  border: "1px solid #000",
  boxShadow: 10,
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
}

export default function InfoModal({ open, setOpen, info }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h3>{info}</h3>
        <CheckCircleIcon
          sx={{
            color: "green",
            width: "50px",
            height: "50px",
          }}
        />
      </Box>
    </Modal>
  )
}
