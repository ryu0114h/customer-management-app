import React, { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { notification } from "antd";
import { TextField } from "@material-ui/core";
import { addUser } from "../../reducks/users/operations";
import { UserType } from "../../reducks/users/types";
import { UsersListPageRouteComponentProps } from "../../routes";

const UserAddPage: React.FC<UsersListPageRouteComponentProps> = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit: SubmitHandler<UserType> = (data) => {
    dispatch(addUser(data));
  };

  const onError: SubmitErrorHandler<UserType> = (data) => {
    notification["error"]({
      message: "正しい値を入力してください。",
      description: "",
    });
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} style={styles.form}>
        <div style={styles.nameTextField}>
          <div style={styles.inputArea}>
            <TextField label="苗字" name="lastName" style={{ width: 240 }} inputRef={register({ required: true })} />
            {errors.lastName && <p style={styles.errors}>苗字を入力してください</p>}
          </div>
          <div style={styles.inputArea}>
            <TextField label="名前" name="firstName" style={{ width: 240 }} inputRef={register({ required: true })} />
            {errors.firstName && <p style={styles.errors}>名前を入力してください</p>}
          </div>
        </div>
        <div style={styles.inputArea}>
          <TextField
            label="年齢"
            name="age"
            style={styles.input}
            inputRef={register({
              required: true,
              validate: (value) => !isNaN(value),
            })}
          />
          {errors.age && <p style={styles.errors}>年齢を入力してください</p>}
        </div>
        <div style={styles.inputArea}>
          <TextField label="住所" name="address" style={styles.input} inputRef={register({ required: true })} />
          {errors.address && <p style={styles.errors}>住所を入力してください</p>}
        </div>
        <div style={styles.inputArea}>
          <TextField label="メモ" name="memo" multiline rows={3} style={styles.input} inputRef={register()} />
        </div>
        <div style={styles.buttonGroup}>
          <button className="ant-btn" type="button" style={styles.button} onClick={() => props.history.goBack()}>
            戻る
          </button>
          <button className="ant-btn ant-btn-primary" type="submit" style={styles.button}>
            追加
          </button>
        </div>
      </form>
    </>
  );
};

export default UserAddPage;

const styles: { [key: string]: CSSProperties } = {
  form: { maxWidth: "500px", margin: "60px auto" },
  inputArea: { margin: "10px 0px", height: 80 },
  input: { width: 500 },
  nameTextField: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errors: { color: "red", marginLeft: 40, marginTop: 10 },
  buttonGroup: {
    margin: "0px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 30,
    marginLeft: 30,
    width: 200,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
