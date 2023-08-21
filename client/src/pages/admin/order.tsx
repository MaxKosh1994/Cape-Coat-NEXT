import { useState, useEffect } from "react"
import { allOrderDataFetch, updateOrderDataFetch } from "../../components/Admin/HTTP/adminApi"
import styles from "../../styles/admin/Order.module.css"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material"
import InfoModal from "../../components/Admin/InfoModal"

export default function Order() {
  const [orders, setOrder] = useState([])
  const [message, setMessage] = useState("")
  const [statusVal, setStatus] = useState({
    status: "Заказ принят",
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    allOrderDataFetch(setOrder)
  }, [])

  const changeHandler = (e) => {
    setStatus({ [e.target.name]: e.target.value })
  }

  const updateHandler = (id) => {
    const index = orders.findIndex((order) => order.id === id)
    if (index !== -1) {
      orders[index].status = statusVal.status
    }
    setOrder([...orders])
    updateOrderDataFetch(id, statusVal.status, setMessage)
    setOpen(true)
    setTimeout(() => {
      setMessage("")
      setOpen(false)
    }, 1000)
  }

  return (
    <div className={styles.mainDiv}>
      <TableContainer
        className={styles.TableContainer}
        sx={{ width: "90%" }}
        component={Paper}
      >
        <Table aria-label="simple table" sx={{ border: "1px solid black" }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "lightgray",
              }}
            >
              <TableCell sx={{ fontSize: "medium" }}>№</TableCell>
              <TableCell sx={{ fontSize: "medium" }}>Дата</TableCell>
              <TableCell sx={{ fontSize: "medium" }}>ФИО</TableCell>
              <TableCell sx={{ fontSize: "medium" }}>Стоимость</TableCell>
              <TableCell sx={{ fontSize: "medium" }}>Адрес</TableCell>
              <TableCell sx={{ fontSize: "medium" }}>Статус</TableCell>
              <TableCell sx={{ fontSize: "medium" }}>
                Изменить статус{" "}
              </TableCell>
              <TableCell sx={{ fontSize: "medium" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {order.createdAt.toString().slice(0, 10).replace(/-/g, ".")}
                </TableCell>
                <TableCell>{order.User.full_name}</TableCell>
                <TableCell>{order.total.toLocaleString()}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell sx={{ fontSize: "medium" }}>
                  <select
                    onChange={changeHandler}
                    className={styles.select}
                    name="status"
                  >
                    <option value="Заказ принят">{"Заказ принят"}</option>
                    <option value="Ждем предоплату">{"Ждем предоплату"}</option>
                    <option value="Заказ в производстве">
                      {"Заказ в производстве"}
                    </option>
                    <option value="Заказ готов">{"Заказ готов"}</option>
                    <option value="Ждем полную оплату">
                      {"Ждем полную оплату"}
                    </option>
                    <option value="Передан в доставку">
                      {"Передан в доставку"}
                    </option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button
                    className={styles.button}
                    onClick={() => updateHandler(order.id)}
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "grey",
                      color: "white",
                      height: "30px",
                      border: "1px solid black",
                    }}
                  >
                    Изменить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InfoModal info={message} open={open} setOpen={setOpen} />
    </div>
  )
}
