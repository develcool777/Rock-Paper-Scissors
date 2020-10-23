class Game {
    constructor() {
        let userScore = 0
        let computerScore = 0
        let amountOfMoves = 0
        let historyOfMoves = []
        let isImposible = false
        let isWithoutDraw = false
        let isEasy = false

        const userScore_span = document.getElementById('user-score')
        const compScore_span = document.getElementById('comp-score')

        const scoreBoard_section = document.querySelector('.score-board')
        const result_section = document.querySelector('.result')
        const history_section = document.querySelector('.history')

        const rock_div = document.getElementById('r')
        const paper_div = document.getElementById('p')
        const scissors_div = document.getElementById('s')

        const clear_div = document.getElementById('clear')
        const historyBtn_div = document.getElementById('historyBtn')
        const imposible_div = document.getElementById('imposible')
        const withoutdraw_div = document.getElementById('withoutdraw')
        const easy_div = document.getElementById('easy')

        Object.defineProperties(this, {
            userScore: {
                get: () => userScore,
                set: (value) => {
                    if (typeof value !== 'number') {
                        throw new Error('Game.userScore set expect value to be a number')
                    }
                    userScore = value
                }
            },

            computerScore: {
                get: () => computerScore,
                set: (value) => {
                    if (typeof value !== 'number') {
                        throw new Error('Game.computerScore set expect value to be a number')
                    }
                    computerScore = value
                }
            },

            amountOfMoves: {
                get: () => amountOfMoves,
                set: (value) => {
                    if (typeof value !== 'number') {
                        throw new Error('Game.amountOfMoves set expect value to be a number')
                    }
                    amountOfMoves = value
                }
            },

            historyOfMoves: { get: () => historyOfMoves },

            isImposible: {
                get: () => isImposible,
                set: (value) => {
                    if (typeof value !== 'boolean') {
                        throw new Error('Game.isImposible set expect value to be a boolean')
                    }
                    isImposible = value    
                }
            },

            isWithoutDraw: {
                get: () => isWithoutDraw,
                set: (value) => {
                    if (typeof value !== 'boolean') {
                        throw new Error('Game.isWithoutDraw set expect value to be a boolean')
                    }
                    isWithoutDraw = value    
                }
            },


            isEasy: {
                get: () => isEasy,
                set: (value) => {
                    if (typeof value !== 'boolean') {
                        throw new Error('Game.isEasy set expect value to be a boolean')
                    }
                    isEasy = value    
                }
            },
            // const
            userScore_span: { get: () => userScore_span },
            compScore_span: { get: () => compScore_span },
            scoreBoard_section: { get: () => scoreBoard_section },
            result_section: { get: () => result_section },
            history_section: { get: () => history_section },
            rock_div: { get: () => rock_div },
            paper_div: { get: () => paper_div },
            scissors_div: { get: () => scissors_div },
            clear_div: { get: () => clear_div },
            historyBtn_div: { get: () => historyBtn_div },
            imposible_div: { get: () => imposible_div },
            withoutdraw_div: { get: () => withoutdraw_div },
            easy_div: { get: () => easy_div },
            // funcions
            winner: {
                get: () => (user, comp) => {
                    if (typeof user !== 'string' || typeof comp !== 'string') {
                        throw new Error(`Game.winner user and comp expect value to be String`)
                    }
                    else if ('rps'.indexOf(user) === -1 || 'rps'.indexOf(comp) === -1) {
                        throw new Error(`Game.winner user and comp expect value to be 'r' or 'p' or 's'`)
                    }
                    else if (user === 'r' && comp === 's' || user === 's' && comp === 'r') {
                        return user === 'r' ? 'user' : 'comp'
                    }
                    else if (user === 'r' && comp === 'p' || user === 'p' && comp === 'r') {
                        return user === 'p' ? 'user' : 'comp'
                    }
                    else if (user === 's' && comp === 'p' || user === 'p' && comp === 's') {
                        return user === 's' ? 'user' : 'comp'
                    } else {
                        return 'draw' 
                    }
 
                } 
            },

            winStrategy: {
                get: () => (playerMove, forWho) => {
                    if (typeof playerMove !== 'string') {
                        throw new Error(`Game.winStrategy playerMove expect value to be String`)
                    }
                    if ('rps'.indexOf(playerMove) === -1) {
                        throw new Error(`Game.winStrategy playerMove expect value to be 'r' or 'p' or 's'`)
                    }
                    if (!(forWho === 'user' || forWho === 'comp')) {
                        throw new Error(`Game.winStrategy forWho expect value to be 'user' or 'comp'`)
                    }
                    if (forWho === 'user') {
                        if (playerMove === 'r') { return 's' }
                        else if (playerMove === 'p') { return 'r' }
                        else { return 'p' }  
                    } else {
                        if (playerMove === 'r') { return 'p' }
                        else if (playerMove === 'p') { return 's' }
                        else { return 'r' }    
                    }  
                }
            },

            textOfMove: {
                get: () => value => {
                    if (typeof value !== 'string') {
                        throw new Error('Game.textOfMove get expect value to be String')
                    }
                    else if ('rps'.indexOf(value) === -1) {
                        throw new Error(`Game.textOfMove value expect to be 'r' or 'p' or 's'`)
                    }
                    return value === 'r' ? 'Rock' : value === 'p' ? 'Paper' : 'Scissors'
                }
            },

            clear: {
                get: () => {
                    this.userScore = 0
                    this.computerScore = 0
                    this.amountOfMoves = 0
                    this.userScore_span.innerHTML = this.userScore
                    this.compScore_span.innerHTML = this.computerScore
                    this.historyOfMoves.splice(0)
                    // table
                    if (this.history_section.style.display === 'block') {
                        this.history_section.innerHTML = '<table><thead><th>№</th><th>User</th><th>Computer</th><th>Result</th><th>Score</th></thead></table>'
                    } else {
                        this.history_section.innerHTML = ''
                    }
                    this.result_section.innerHTML = `<p>User VS Computer. Who will win?</p>`
                    // buttons
                    isImposible = false
                    isWithoutDraw = false
                    isEasy = false

                    imposible_div.innerHTML = 'Imposible mode: Off'
                    withoutdraw_div.innerHTML = 'Without draw mode: Off'
                    easy_div.innerHTML = 'Easy mode: Off'

                    // historyBtn.classList.remove('activeBtn') ????
                    easy_div.classList.remove('activeBtn')
                    withoutdraw_div.classList.remove('activeBtn')
                    imposible_div.classList.remove('activeBtn')

                }
            },

            mode: {
                get: () => whichMode => {
                    if (typeof whichMode !== 'string') {
                        throw new Error('Game.mode get expect whichMode to be String')
                    }
                    if (!(whichMode === 'Imposible' || whichMode === 'Easy' || whichMode === 'Without draw')) {
                        throw new Error(`Game.mode get expect whichMode to be 'Imposible' or 'Easy' or 'Without draw'`) 
                    }

                    if (whichMode === 'Imposible') {
                        if (isImposible === true) {
                            isImposible = false
                            imposible_div.innerHTML = 'Imposible mode: Off'
                            imposible_div.classList.remove('activeBtn')
                        } 
                        else {
                            isImposible = true
                            isWithoutDraw = false
                            isEasy = false
                            imposible_div.innerHTML = 'Imposible mode: On'
                            imposible_div.classList.add('activeBtn')

                            withoutdraw_div.classList.remove('activeBtn')
                            easy_div.classList.remove('activeBtn')

                            withoutdraw_div.innerHTML = 'Without draw mode: Off'
                            easy_div.innerHTML = 'Easy mode: Off'
                        }
                    }
                    else if (whichMode === 'Easy') {
                        if (isEasy === true) {
                            isEasy = false
                            easy_div.innerHTML = 'Easy mode: Off'
                            easy_div.classList.remove('activeBtn')
                        } 
                        else {
                            isEasy = true
                            isImposible = false
                            isWithoutDraw = false

                            easy_div.classList.add('activeBtn')
                            easy_div.innerHTML = 'Easy mode: On'

                            withoutdraw_div.classList.remove('activeBtn')
                            imposible_div.classList.remove('activeBtn')

                            withoutdraw_div.innerHTML = 'Without draw mode: Off'
                            imposible_div.innerHTML = 'Imposible mode: Off'
                            
                        }
                    }
                    else {
                        if (isWithoutDraw === true) {
                            isWithoutDraw = false 
                            withoutdraw_div.innerHTML = 'Without draw mode: Off' 
                            withoutdraw_div.classList.remove('activeBtn')
                        } else {
                            isWithoutDraw = true
                            isImposible = false
                            isEasy = false

                            withoutdraw_div.classList.add('activeBtn')
                            withoutdraw_div.innerHTML = 'Without draw mode: On'

                            easy_div.classList.remove('activeBtn')
                            imposible_div.classList.remove('activeBtn')

                            imposible_div.innerHTML = 'Imposible mode: Off'
                            easy_div.innerHTML = 'Easy mode: Off'
                        }

                    }
                }
            },

            strategies: {
                get: () => (arr2D, indexOfMove, whoWon) => {
                    // arr2D[amountOfMoves, UserMove, ComputerMove, result, score]
                    if (!Array.isArray(arr2D)) {
                        throw new Error(`Game.strategies arr2D expect  to be Array`) 
                    }
                    if (!arr2D.every(arr => Array.isArray(arr)) && arr.length === 5) {
                        throw new Error(`Game.strategies arr2D elements expect to be Array with length 5`) 
                    }
                    if (indexOfMove < 1 || indexOfMove > 2 && !isNaN(indexOfMove)) {
                        throw new Error(`Game.strategies indexOfMove expect value to be Number in range 1 or 2`) 
                    }
                    if (typeof whoWon !== 'string') {
                        throw new Error(`Game.strategies whoWon expect to be String`) 
                    }
                    if (!(whoWon === 'User won' || whoWon === 'Computer won')) {
                        throw new Error(`Game.strategies whoWon expect value to be User won or Computer won`) 
                    }
                    const frequency = (array, index) => {
                        const obj = {}
                        array.forEach(arr => {
                            if (obj[arr[index]] === undefined) {
                                obj[arr[index]] = 1
                            } else {
                                obj[arr[index]] += 1
                            }
                        }) 
                        return obj 
                    }
                    const UserVictories = arr2D.filter(arr => arr[3] === whoWon)
                    const frequencyOfMoves = frequency(UserVictories, indexOfMove)
                    const merge = Object.keys(frequencyOfMoves).map((e,i) => [e, Object.values(frequencyOfMoves)[i]])
                    merge.sort((a,b) => b[1] - a[1])
                    return merge
                }
            }
        });
    }

    get test() {
        const test = [
        [1, "Scissors", "Scissors", "Draw", "0:0"],
        [2, "Paper", "Paper", "Draw", "0:0"],
        [3, "Paper", "Rock", "User won", "1:0"],
        [4, "Rock", "Rock", "User won", "2:0"],
        [5, "Paper", "Scissors", "Computer won", "2:1"],
        [6, "Rock", "Rock", "User won", "3:1"]
        ]
        console.log(this.strategies(test, 1, 'User won'))
        console.log(this.userScore)
        console.log(this.userScore += 3)
        console.log(this.winner('p', 'r'))
        console.log(this.result_section)
        this.historyOfMoves.push(['j'])
        console.log(this.textOfMove('r'))
        console.log(this.result_section.innerHTML = 'powercpoj')
    }

    get main() {
        this.rock_div.addEventListener('click', () => this.play('r', this.isImposible, this.isWithoutDraw, this.isEasy))
        this.paper_div.addEventListener('click', () => this.play('p', this.isImposible, this.isWithoutDraw, this.isEasy))
        this.scissors_div.addEventListener('click', () => this.play('s', this.isImposible, this.isWithoutDraw, this.isEasy))  
        this.clear_div.addEventListener('click', () => this.clear)
        this.historyBtn_div.addEventListener('click', () => this.drawTable(this.historyOfMoves, this.history_section, this.historyBtn_div))
        this.imposible_div.addEventListener('click', () => this.mode('Imposible'))
        this.withoutdraw_div.addEventListener('click', () => this.mode('Without draw'))
        this.easy_div.addEventListener('click', () => this.mode('Easy'))
    }

    play(playerMove, isImposible, isWithoutDraw, isEasy) {
        this.amountOfMoves += 1 
        const compMoves = ['r', 'p', 's']
        if (isWithoutDraw) {
            compMoves.splice(compMoves.indexOf(playerMove),1)
        }
        let compMove
        if (isImposible) {
            compMove = this.winStrategy(playerMove, 'comp')
        }
        else if (isEasy) {
            compMove = this.winStrategy(playerMove, 'user')
        } 
        else {
            compMove = compMoves[Math.floor(Math.random() * compMoves.length)]
        }
        
        const playerTextOfMove = this.textOfMove(playerMove)
        const compTextOfMove = this.textOfMove(compMove)
        const result = this.winner(playerMove, compMove)
        if (result === 'user') {
            this.userScore += 1
            this.draw(false, playerTextOfMove, compTextOfMove, 'User', this.userScore)
            this.historyOfMoves.push([this.amountOfMoves, playerTextOfMove, compTextOfMove, 'User won', `${this.userScore}:${this.computerScore}`])
        }
        else if (result === 'comp') {
            this.computerScore += 1
            this.draw(false, playerTextOfMove, compTextOfMove, 'Computer', this.computerScore)
            this.historyOfMoves.push([this.amountOfMoves, playerTextOfMove, compTextOfMove, 'Computer won', `${this.userScore}:${this.computerScore}`])
        } else {
            this.draw(true, playerTextOfMove, compTextOfMove)
            this.historyOfMoves.push([this.amountOfMoves, playerTextOfMove, compTextOfMove, 'Draw', `${this.userScore}:${this.computerScore}`])
        }
    }

    draw(isDraw, player, comp, whoWon, point) {
        if (isDraw) {
            this.userScore_span.classList.add('red');
            this.compScore_span.classList.add('red');
            setTimeout(() => {
                this.userScore_span.classList.remove('red')
                this.compScore_span.classList.remove('red')
            }, 500)
            const user = `<div class="center left"><p>UserMove</p><p class="red">${player}</p></div>`
            const result = `<p>It's a draw</p>`
            this.result_section.innerHTML = `<div class="between">${user}<div class="center">ComputerMove<p class="red">${comp}</p></div></div>${result}`
        }
        else if (whoWon === 'User') {
            this.userScore_span.innerHTML = point
            this.userScore_span.classList.add('green');
            this.compScore_span.classList.add('red');
            setTimeout(() => {
                this.userScore_span.classList.remove('green')
                this.compScore_span.classList.remove('red')
            }, 500)
            const user = `<div class="center left"><p>UserMove</p><p class="green">${player}</p></div>`
            const result = '<p>User win</p>'
            this.result_section.innerHTML = `<div class="between">${user}<div class="center">ComputerMove<p class="red">${comp}</p></div></div>${result}`
        } 
        else if (whoWon === 'Computer') {
            this.compScore_span.innerHTML = point
            this.userScore_span.classList.add('red');
            this.compScore_span.classList.add('green');
            setTimeout(() => {
                this.userScore_span.classList.remove('red')
                this.compScore_span.classList.remove('green')
            }, 500)
            const user = `<div class="center left"><p>UserMove</p><p class="red">${player}</p></div>`
            const result = '<p>Computer win</p>'
            this.result_section.innerHTML = `<div class="between">${user}<div class="center">ComputerMove<p class="green">${comp}</p></div></div>${result}`
        } else {
            throw new Error('Something went wrong')
        }
    }

    drawTable(moves, historySection, historyBtn) {
        if (historySection.style.display === 'block') {
            historySection.style.display = 'none'
            historyBtn.innerHTML = 'Show history'
            historyBtn.classList.remove('activeBtn')
        } else {
            historySection.style.display = 'block'
            historyBtn.innerHTML = 'Hide history' 
            historyBtn.classList.add('activeBtn')
        }
        if (typeof moves !== 'object') {
            throw new Error('Game.drawTable expect Array')
        }

        let result = '<table>'
        let thead = '<thead><th>№</th><th>User</th><th>Computer</th><th>Result</th><th>Score</th></thead>'
        let tbody = '<tbody>'
        moves.forEach(arr =>{
            tbody += '<tr>'
            arr.forEach(item => {
                tbody += `<td>${item}</td>`
            })
            tbody += '</tr>'
        })
        tbody += '</tbody>'

        // tfoot
        let tfoot = '<tfoot><tr><th class="colorth" colspan="5">Analysis of the game</th></tr>'
        tfoot += '<tr><th colspan="2">User</th><th class="colorth"></th><th colspan="2">Computer</th></tr>'
        tfoot += '<tr><th>Move</th><th>Number of wins</th><th class="colorth"></th><th>Move</th><th>Number of wins</th></tr>'

        const userStrategy = this.strategies(moves, 1, 'User won')
        const compStrategy = this.strategies(moves, 2, 'Computer won')
        if (userStrategy.length < 1 || compStrategy.length < 1) {
            tfoot += '<tr><th class="colorth" colspan="5">User and Computer must win at least 1 time</th></tr>'
        } else {
            for (let i=0; i<Math.max(userStrategy.length, compStrategy.length); i++) {
                const between = '<th class="colorth"></th>'
                const empty = '<td colspan="2">Play more</td>'
                if (userStrategy[i] !== undefined && compStrategy[i] !== undefined) {
                    const user = `<td>${userStrategy[i][0]}</td><td>${userStrategy[i][1]}</td>`
                    const comp = `<td>${compStrategy[i][0]}</td><td>${compStrategy[i][1]}</td>`
                    tfoot += `<tr>${user}${between}${comp}</tr>` 
                }
                else if (userStrategy[i] === undefined ) {
                    const comp = `<td>${compStrategy[i][0]}</td><td>${compStrategy[i][1]}</td>`
                    tfoot += `<tr>${empty}${between}${comp}</tr>` 
                } else {
                    const user = `<td>${userStrategy[i][0]}</td><td>${userStrategy[i][1]}</td>`
                    tfoot += `<tr>${user}${between}${empty}</tr>` 
                }
            }
            if (userStrategy.length > 2 && compStrategy.length > 2) {
                tfoot += `<tr><th class="colorth" colspan="4">Best Strategy for User</th><th>${userStrategy[0][0]}</th></tr>`
                tfoot += `<tr><th class="colorth" colspan="4">Best Strategy for Computer</th><th>${compStrategy[0][0]}</th></tr>`
            }
        }
        
        tfoot += '</tfoot>'
        result += `${thead}${tbody}${tfoot}</table>`
        historySection.innerHTML = result

    }
};


const f = new Game()
// f.test
f.main
