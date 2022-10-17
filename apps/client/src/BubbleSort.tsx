import { useState } from "react";

export const BubbleSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorted, setSorted] = useState<boolean>(false);
  const [i, setI] = useState<number>(0);
  const [j, setJ] = useState<number>(0);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const generateArray = () => {
		const array = [];
		for (let i = 0; i < 10; i++) {
			array.push(Math.floor(Math.random() * 100));
		}
    setArray(array);
    setSorted(false);
    setI(0);
    setJ(0);
	};

	const bubbleSort = async () => {
		const a: number[] = [...array];
    for (let i = 0; i < a.length; i++) {
      setI(i);
      for (let j = 0; j < a.length; j++) {
        setJ(j);
        await wait(100);
				if (a[j] > a[j + 1]) {
					const temp = a[j];
					a[j] = a[j + 1];
					a[j + 1] = temp;
          setArray(a);
				}
			}
		}
    setArray(a);
    setSorted(true);
  };
  
  const Columns = ({ array }: { array: number[] }) => {
    return (
      <>
        {array.map((value, index) => (
          <div className="flex flex-col">
            {value}
            <div
              key={index}
              style={{
                width: "20px",
                height: `${value * 5}px`,
                backgroundColor: sorted? "green" : index === i ? "purple" : index === j ? "blue" : "black",
                display: "inline-block",
                margin: "0 1px",
              }}
            ></div>
          </div>
        ))}
      </>
    );
  };

	return (
		<div className="bg-green-300 h-screen flex flex-col items-center gap-10">
			<div className="grow  m-5 flex items-end gap-10">
				<Columns array={array} />
			</div>
			<div className="m-5 flex gap-5">
				<button onClick={generateArray}>Generate Array!</button>
				<button onClick={bubbleSort}>Bubble Sort</button>
			</div>
		</div>
	);
};
