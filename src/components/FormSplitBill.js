import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidbyUser, setPaidByUser] = useState("");
  const paidByfriend = bill > 0 ? bill - paidbyUser : "";
  const [whoisPaying, setwhoisPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidbyUser) return;
    onSplitBill(whoisPaying === "user" ? paidByfriend : -paidbyUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a Bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🤵 Your Expense</label>
      <input
        type="text"
        value={paidbyUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidbyUser : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={paidByfriend} />

      <label>🤑 Who is paying the Bill</label>
      <select
        value={whoisPaying}
        onChange={(e) => setwhoisPaying(e.target.value)}
      >
        <option value="user" key="user">
          You
        </option>
        <option value="friend" key="friend">
          {selectedFriend.name}
        </option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
