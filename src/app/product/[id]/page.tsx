type props = {
    params:{
        id:string
    }
};

export default function ProductPage({params: {id}}:props ) { 
  return (
    <div className="">
        <h1>Пицца {id}</h1>
    </div>
  );
}