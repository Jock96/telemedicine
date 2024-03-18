import { Base64 } from "js-base64";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface UseUrlStatePramsProps<T> {
  initialState: T;
  paramsName: string;
  serialize?: (data: T | undefined) => string | undefined;
  deserialize?: (data: string) => T;
}

const defaultSerialize = <T>(data?: T) =>
  data ? Base64.encode(JSON.stringify(data)) : undefined;

const defaultDeserialize = <T>(data: string): T =>
  JSON.parse(Base64.decode(data));

export function useUrlStatePrams<T>({
  initialState,
  paramsName,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize,
}: UseUrlStatePramsProps<T>): [T | undefined, (data?: T) => void] {
  const location = useLocation();
  const navigate = useNavigate();

  const search = new URLSearchParams(location.search);

  const existingValue = search.get(paramsName);
  const prevExistingValue = useRef<string | null>(null);

  const [state, setState] = useState<T | undefined>(
    existingValue ? deserialize(existingValue) : initialState
  );

  useEffect(() => {
    if (existingValue !== prevExistingValue.current) {
      setState(existingValue ? deserialize(existingValue) : undefined);
    }

    prevExistingValue.current = existingValue;
  }, [deserialize, existingValue, initialState]);

  const onChange = (data?: T) => {
    const searchParams = new URLSearchParams(location.search);
    const serialized = serialize(data);
    if (serialized) {
      searchParams.set(paramsName, serialized);
    } else {
      searchParams.delete(paramsName);
    }
    const pathname = location.pathname;
    navigate({ pathname, search: searchParams.toString() });
  };

  return [state, onChange];
}
