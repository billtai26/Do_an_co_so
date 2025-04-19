/* eslint-disable no-unused-vars */
// _id.jsx
import { ThemeProvider } from '@mui/material/styles'
import { useState, useMemo, useEffect, useCallback } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '~/theme' // Adjust the import path as needed
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { cloneDeep } from 'lodash'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix cứng boardId
    const boardId = '6802761a3609b8bce675ac30'
    // Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode')
    return savedMode || 'light'
  })

  const [boardData, setBoardData] = useState(null)
  const [filteredBoardData, setFilteredBoardData] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState([])
  const [sortType, setSortType] = useState('default')

  // Initialize board data
  useEffect(() => {
    // Add priority and deadline to mock data cards for sorting/filtering
    const enhancedData = cloneDeep(mockData)

    // Add sample priority and deadline to cards
    enhancedData.board.columns.forEach(column => {
      column.cards.forEach(card => {
        if (!card.FE_PlaceholderCard) {
          // Set random priority
          const priorities = ['low', 'medium', 'high']
          card.priority = card.priority || priorities[Math.floor(Math.random() * priorities.length)]

          // Set random deadline between today and 14 days in the future
          if (!card.deadline) {
            const today = new Date()
            const futureDate = new Date()
            futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14))
            card.deadline = futureDate.toISOString()
          }

          // Add subtasks array if it doesn't exist
          card.subtasks = card.subtasks || []
        }
      })
    })

    setBoardData(enhancedData.board)
    setFilteredBoardData(enhancedData.board)
  }, [])

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const actualMode = mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode

  const theme = useMemo(() => getTheme(actualMode), [actualMode])

  // Apply search and filters to board data
  const applyFiltersAndSearch = useCallback(() => {
    if (!boardData) return

    const clonedData = cloneDeep(boardData)

    // Apply search term filter
    if (searchTerm) {
      clonedData.columns = clonedData.columns.map(column => {
        const filteredCards = column.cards.filter(card => {
          // Skip the placeholder cards
          if (card.FE_PlaceholderCard) return true

          // Search in title and description
          const titleMatch = card.title?.toLowerCase().includes(searchTerm.toLowerCase())
          const descMatch = card.description?.toLowerCase().includes(searchTerm.toLowerCase())
          return titleMatch || descMatch
        })

        return {
          ...column,
          cards: filteredCards
        }
      })
    }

    // Apply status filters
    // Make sure activeFilters is always an array
    const filtersArray = Array.isArray(activeFilters) ? activeFilters : []

    if (filtersArray.length > 0) {
      const statusFilters = filtersArray.filter(filter => ['todo', 'doing', 'done'].includes(filter))
      const priorityFilters = filtersArray.filter(filter => ['high-priority', 'medium-priority', 'low-priority'].includes(filter))
      const dateFilters = filtersArray.filter(filter => ['due-today', 'due-this-week'].includes(filter))

      if (statusFilters.length > 0 || priorityFilters.length > 0 || dateFilters.length > 0) {
        clonedData.columns = clonedData.columns.map(column => {
          let filteredCards = column.cards

          // Apply status filters
          if (statusFilters.length > 0) {
            // Map column titles to filter names
            const columnToFilter = {
              'To Do Column 01': 'todo',
              'Inprogress Column 02': 'doing',
              'Done Column 03': 'done'
            }

            const columnFilter = columnToFilter[column.title]
            if (!statusFilters.includes(columnFilter)) {
              // Keep only placeholder cards
              filteredCards = filteredCards.filter(card => card.FE_PlaceholderCard)
            }
          }

          // Apply priority filters
          if (priorityFilters.length > 0) {
            filteredCards = filteredCards.filter(card => {
              if (card.FE_PlaceholderCard) return true

              // Map filter names to priority values
              const filterToPriority = {
                'high-priority': 'high',
                'medium-priority': 'medium',
                'low-priority': 'low'
              }

              // Check if card priority matches any of the selected priority filters
              return priorityFilters.some(filter => filterToPriority[filter] === card.priority)
            })
          }

          // Apply date filters
          if (dateFilters.length > 0) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            const endOfWeek = new Date(today)
            endOfWeek.setDate(today.getDate() + (7 - today.getDay()))

            filteredCards = filteredCards.filter(card => {
              if (card.FE_PlaceholderCard) return true
              if (!card.deadline) return false

              const cardDeadline = new Date(card.deadline)
              cardDeadline.setHours(0, 0, 0, 0)

              if (dateFilters.includes('due-today') && cardDeadline.getTime() === today.getTime()) {
                return true
              }

              if (dateFilters.includes('due-this-week') &&
                  cardDeadline >= today && cardDeadline <= endOfWeek) {
                return true
              }

              return false
            })
          }

          return {
            ...column,
            cards: filteredCards
          }
        })
      }
    }

    // Apply sorting
    if (sortType !== 'default') {
      clonedData.columns = clonedData.columns.map(column => {
        const cardsToSort = column.cards.filter(card => !card.FE_PlaceholderCard)
        const placeholderCards = column.cards.filter(card => card.FE_PlaceholderCard)

        let sortedCards = [...cardsToSort]

        switch (sortType) {
        case 'deadline-asc':
          sortedCards.sort((a, b) => {
            if (!a.deadline) return 1
            if (!b.deadline) return -1
            return new Date(a.deadline) - new Date(b.deadline)
          })
          break

        case 'deadline-desc':
          sortedCards.sort((a, b) => {
            if (!a.deadline) return 1
            if (!b.deadline) return -1
            return new Date(b.deadline) - new Date(a.deadline)
          })
          break

        case 'priority-desc':
          // Sort high > medium > low
          const priorityValues = { high: 3, medium: 2, low: 1 }
          sortedCards.sort((a, b) => {
            const priorityA = priorityValues[a.priority] || 0
            const priorityB = priorityValues[b.priority] || 0
            return priorityB - priorityA
          })
          break

        case 'priority-asc':
          // Sort low > medium > high
          const priorityValuesAsc = { high: 3, medium: 2, low: 1 }
          sortedCards.sort((a, b) => {
            const priorityA = priorityValuesAsc[a.priority] || 0
            const priorityB = priorityValuesAsc[b.priority] || 0
            return priorityA - priorityB
          })
          break

        default:
          break
        }

        return {
          ...column,
          cards: [...sortedCards, ...placeholderCards],
          cardOrderIds: [...sortedCards.map(card => card._id), ...placeholderCards.map(card => card._id)]
        }
      })
    }

    setFilteredBoardData(clonedData)
  }, [boardData, searchTerm, activeFilters, sortType])

  // Apply filters whenever any dependency changes
  useEffect(() => {
    applyFiltersAndSearch()
  }, [applyFiltersAndSearch])

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue)
  }

  const handleFilterChange = (filters) => {
    // Ensure filters is always an array
    const filtersArray = Array.isArray(filters) ? filters : []
    setActiveFilters(filtersArray)
  }

  const handleSortChange = (sort) => {
    setSortType(sort)
  }

  if (!filteredBoardData) return null

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', bgcolor: 'background.default' }}>
        <AppBar
          mode={mode}
          setMode={setMode}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
        <BoardBar
          board={board}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
        <BoardContent board={board} />
      </Container>
    </ThemeProvider>
  )
}

export default Board
