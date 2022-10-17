import axios from "axios";
import { useState, useEffect } from "react";

type Response<T> = {
	state: T;
};

type SetState<T> = (state: T) => void;

const events = new Map<string, SetState<any>[]>();
const cache = new Map<string, Date>();

export const useServerState = <T>(resourceUrl: string) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
		setIsLoading(true);
    try {
      if (cache.has(resourceUrl) && cache.get(resourceUrl)!.getTime() > Date.now() - 100) {
        console.log('Using cache');
      } else {
      
      const { data } = await axios.get<Response<T>>(resourceUrl);
      events.get(resourceUrl)?.forEach((setState) => setState(data.state));
        setData(data.state);
        cache.set(resourceUrl, new Date());
      }
		} catch (error) {
			setError(error as Error);
		}
		setIsLoading(false);
	};

  useEffect(() => {
    
    const event = events.get(resourceUrl);
    if (event) {
      event.push(setData);
    } else {
      events.set(resourceUrl, [setData]);
    }

		fetchData();
	}, [resourceUrl]);

  const dispatch = async (action: {type: string, payload?: any}) => {
		const { data: newData } = await axios.post<Response<T>>(resourceUrl, action);
		fetchData();
	};

	return [
		data,
		dispatch,
		isLoading,
		error,
  ] as const;
};
