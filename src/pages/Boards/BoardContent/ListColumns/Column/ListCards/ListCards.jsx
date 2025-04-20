/* eslint-disable no-unused-vars */
import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState, useCallback, useEffect } from 'react'

function ListCards({ cards: initialCards, onCardsChange }) {
  const [cards, setCards] = useState(initialCards)

  // Update when props change
  useEffect(() => {
    setCards(initialCards)
  }, [initialCards])

  const handleCardUpdate = useCallback((updatedCard) => {
    const newCards = cards.map(card =>
      card._id === updatedCard._id ? updatedCard : card
    )

    setCards(newCards)

    // Notify parent component if needed
    if (onCardsChange) {
      onCardsChange(newCards)
    }
  }, [cards, onCardsChange])

  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '0 5px 5px 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) => `calc(
          ${theme.trello.boardContentHeight} -
          ${theme.spacing(5)} -
          ${theme.trello.columnHeaderHeight} -
          ${theme.trello.columnFooterHeight}
        )`,
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
      }}>
        {cards?.map(card => (
          <Card
            key={card._id}
            card={card}
            updateCard={handleCardUpdate}
          />
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
