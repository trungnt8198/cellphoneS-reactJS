import { Children } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

function Form({ children, onSubmit, schema = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: schema && yupResolver(schema),
  });

  const inputs = Children.map(children, (child) => {
    if (child.type === TextInput) {
      return {
        ...child,
        props: {
          ...child.props,
          register,
          message: errors[child.props.name]?.message,
        },
      };
    }
    return child;
  });

  return <form onSubmit={handleSubmit(onSubmit)}>{inputs}</form>;
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  schema: PropTypes.object,
};

export default Form;
