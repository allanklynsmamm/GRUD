import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 50px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.cpf.value = onEdit.cpf;
      user.veiculo.value = onEdit.veiculo;
      user.km.value = onEdit.km;
      user.placa.value = onEdit.placa;
      user.observacao.value = onEdit.observacao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.cpf.value ||
      !user.veiculo.value ||
      !user.km.value ||
      !user.placa.value ||
      !user.observacao.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          cpf: user.cpf.value,
          veiculo: user.veiculo.value,
          km: user.km.value,
          placa: user.placa.value,
          observacao: user.observacao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          cpf: user.cpf.value,
          veiculo: user.veiculo.value,
          km: user.km.value,
          placa: user.placa.value,
          observacao: user.observacao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.cpf.value = "";
    user.veiculo.value = "";
    user.km.value = "";
    user.placa.value = "";
    user.observacao.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cpf" />
      </InputArea>
      <InputArea>
        <Label>Veiculo</Label>
        <Input name="veiculo" />
      </InputArea>
      <InputArea>
        <Label>KM</Label>
        <Input name="km" />
      </InputArea>
      <InputArea>
        <Label>Placa</Label>
        <Input name="placa" />
      </InputArea>
      <InputArea>
        <Label>Observação</Label>
        <Input name="observacao" type="text" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
