function Gameboard(){
    let board = ['', '', '', '', '', '', '', '', '']

    const getBoard = () => board;

    const resetBoard = () =>{
        board = ['', '', '', '', '', '', '', '', '']
    }

    const setToken = (index, token) =>{
        if(board[index] === ''){
            board[index] = token
            return true
        }
        return false
    }

    return { getBoard, resetBoard, setToken}
}

function Players(name, token){
    return {name, token}
}

function DisplayController(){

}