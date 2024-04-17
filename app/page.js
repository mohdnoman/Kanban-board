"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@chakra-ui/react";
import AddColumnForm from "./components/AddColumnForm";
import Column from './components/Column';
import AddItemForm from './components/AddItemForm';
import { motion } from 'framer-motion';
import { AddIcon } from "@chakra-ui/icons";
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const storedColumns = JSON.parse(localStorage.getItem('columns'));
    if (storedColumns) {
      setColumns(storedColumns);
    }
  }, []);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenAddItemDialog = (columnId) => {
    setAddItemDialogOpen(true);
    setSelectedColumnId(columnId);
  };

  const handleCloseAddItemDialog = () => {
    setAddItemDialogOpen(false);
  };

  const addColumn = (column) => {
    const updatedColumns = [...columns, column];
    setColumns(updatedColumns);
    localStorage.setItem('columns', JSON.stringify(updatedColumns));
  };

  const deleteColumn = (columnId) => {
    const updatedColumns = columns.filter(column => column.id !== columnId);
    setColumns(updatedColumns);
    localStorage.setItem('columns', JSON.stringify(updatedColumns));
  };

  const addItemToColumn = (columnId, itemName, deadline) => {
    const updatedColumns = columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          items: [
            ...column.items,
            { id: uuidv4(), name: itemName, deadline: deadline }
          ]
        };
      }
      return column;
    });
    setColumns(updatedColumns);
    localStorage.setItem('columns', JSON.stringify(updatedColumns));
  };

  const deleteItem = (columnId, itemId) => {
    setColumns(prevColumns => {
      const updatedColumns = prevColumns.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            items: column.items.filter(item => item.id !== itemId)
          };
        }
        return column;
      });
      return updatedColumns;
    });
  };

  return (
    <DndContext>
      <div className='bg-gradient-to-br from-blue-100 to-teal-100'>
        <header className="p-6 flex justify-between items-center">
          <motion.div
            className="text-3xl text-blue-900 font-sans font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Kanban Board
          </motion.div>
          <div>
            <Button
              onClick={handleOpenDialog}
              colorScheme="blue"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              leftIcon={<AddIcon />}
            >
              Add Container
            </Button>
          </div>
        </header>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <AddColumnForm isOpen={isDialogOpen} onClose={handleCloseDialog} addColumn={addColumn} />
          <AddItemForm
            isOpen={addItemDialogOpen}
            onClose={handleCloseAddItemDialog}
            onSubmit={(columnId, itemName, deadline) => addItemToColumn(columnId, itemName, deadline)}
            selectedColumnId={selectedColumnId}
            columns={columns}
          />

          {columns.length === 0 ? ( // Check if there are no columns
            <div className="text-center text-gray-600">
              Add a container to manage tasks.
            </div>
          ) : (
            <section className='flex flex-wrap gap-4 '>
              {columns.map((column) => (
                <SortableContext key={column.id} items={column.items}>
                  <Column
                    id={column.id}
                    name={column.name}
                    items={column.items}
                    deleteColumn={deleteColumn}
                    openItemDialog={() => handleOpenAddItemDialog(column.id)}
                    deleteItem={deleteItem}
                  />
                </SortableContext>
              ))}
            </section>
          )}
        </main>
      </div>
    </DndContext>
  );
}
