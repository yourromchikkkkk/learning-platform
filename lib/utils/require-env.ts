const requireEnv = (
  name: string,
  value?: string,
  defaultValue?: string,
) => {
  if (!value && !defaultValue) {
    throw new Error(
      `${name} is required in environment variables, but was not provided`,
    );
  }

  return value || defaultValue;
};

export default requireEnv;
