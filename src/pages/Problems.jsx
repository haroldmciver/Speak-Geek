import { useState } from 'react'
import { QUESTIONS } from './questions/questions'
import '../css/problems.css'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';  

export default function Problems() {
    const navigate = useNavigate();  
    const [searchTerm, setSearchTerm] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [randomQuestionId, setRandomQuestionId] = useState(null);

    function truncate(str, length) {
        return str.length > length ? str.substring(0, length - 3) + "..." : str
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
        const randomId = QUESTIONS[randomIndex].id;
        setRandomQuestionId(randomId);
        navigate(`/speaktool/problemset/${randomId}`);  // Use navigate
    }


    return (
        <div className='problems-page'>
            <div className="problems-container problem">
                <div className='header-section'>
                    <h2>Practice Behavioral Interviews</h2>
                    <p>With our behavioral AI tool, you can practice your behavioral interview skills and get better at your soft skills.</p>
                </div>

                <div className='table-section'>
                    <div className='search-section-problems'>
                        <TextField
                            style={ {width: '30rem'} }
                            variant="outlined"
                            placeholder="Search for problem"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SendIcon className='submit-icon'/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        <Select
                            style={{ width: '10%' }}
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            variant="outlined"
                            displayEmpty
                            fullWidth
                            >
                            <MenuItem value="" >All</MenuItem>
                            <MenuItem value="easy" style={{color: "green"}}>Easy</MenuItem>
                            <MenuItem value="medium" style={{color: "orange"}}>Medium</MenuItem>
                            <MenuItem value="hard" style={{color: "red"}}>Hard</MenuItem>

                        </Select>
                        <div className='random-select' onClick={getRandomQuestion}>
                            <h2>Random</h2>
                            <AutorenewIcon />
                        </div>
                    </div>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'white', borderTop: '.5px solid gray' }}>
                            <TableCell>Status</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Difficulty</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {QUESTIONS.filter(q => 
                            (!difficulty || q.difficulty === difficulty) &&
                            (!searchTerm || 
                                q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                q.id.toString() === searchTerm.trim())
                                )
                                .map((question) => (
                                    <TableRow key={question.id}>
                                    <TableCell>
                                        <Checkbox color="primary" /> 
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/speaktool/problemset/${question.id}`} className='question-link'>
                                            {question.id}. {truncate(question.title, 100)} 
                                        </Link>
                                    </TableCell>
                                    <TableCell className={`difficulty-${question.difficulty} difficulty-rating`}>
                                        {question.difficulty ? capitalizeFirstLetter(question.difficulty) : ''}
                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                </div>
            </div>
        </div>
        )
}