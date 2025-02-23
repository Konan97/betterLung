const Display = (props) => {
    console.log('list', props.items)
    return (
      <div>
        {props.items.map(item => <p key = {item.id}>{item.id}. {item.content}</p>)}
      </div>
      
    )
  }

export default Display