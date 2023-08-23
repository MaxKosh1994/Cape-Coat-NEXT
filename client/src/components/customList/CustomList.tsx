import React, { useState } from "react"
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

interface CustomListProps {
  name: string
  data: string
}

export default function CustomList({
  name,
  data,
}: CustomListProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <List
        sx={{
          margin: 0,
          padding: 0,
          width: 360,
          bgcolor: "background.paper",
          borderRadius: 0,
        }}
        component={Paper}
        elevation={3}
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={name} sx={{ textAlign: "left" }} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItemButton>
            <Typography sx={{ textAlign: "left" }}>{data}</Typography>
          </ListItemButton>
        </Collapse>
      </List>
    </>
  )
}
