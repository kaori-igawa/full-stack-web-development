'use client';

export default function Page() {
  const showDialog:any = () => {
    alert('アラート');
  };

  return(
    <div><button onClick={showDialog()}>click</button></div>
  );
}
