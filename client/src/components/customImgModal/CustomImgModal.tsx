import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import "./customImgModalStyel.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  "@media (max-width: 767px)": {
    width: 300,
  },
}

export default function CustomImgModal({ open, onClose, imageUrl }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <div className="modalContentStyle">
            <img
              className="modalImgStyle"
              src={imageUrl}
              alt="Enlarged Textile"
            />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
