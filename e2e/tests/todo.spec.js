const { test, expect, beforeEach, describe } = require('@playwright/test');
const { resetDB } = require('./utils/db');

describe('e2e', () => {

  beforeEach(async () => {
    await resetDB();
  });
  

  test('Create a TODO', async ({ page }) => {
    const todoItems = [
      'TODO TEST 1',
      'TODO TEST 2',
    ];
    
    // Create a TODO from UI
    await page.goto('/');

    await page.screenshot({ path: 'screenshot-create00.png' });

    await page.getByRole('textbox').fill(todoItems[0]);

    await page.screenshot({ path: 'screenshot-create01.png' });

    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByTestId('todo-title')).toHaveText([todoItems[0]]);
    await expect(page.getByTestId('todo-status')).toHaveText('This todo is not done');

    await page.screenshot({ path: 'screenshot-create02.png' });

    await page.getByRole('textbox').fill(todoItems[1]);
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByTestId('todo-title')).toHaveText([
      todoItems[0],
      todoItems[1]
    ]);
    await expect(page.getByTestId('todo-status')).toHaveText([
      'This todo is not done',
      'This todo is not done'
    ])
    await page.screenshot({ path: 'screenshot-create03.png' });    
  });

  test('Complete a TODO', async ({ page }) => {
    const todoItems = [
      'TODO to complete',
    ];
    
    // Create a TODO from UI
    await page.goto('/');

    await page.getByRole('textbox').fill(todoItems[0]);
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByTestId('todo-title')).toHaveText([todoItems[0]]);
    await expect(page.getByTestId('todo-status')).toHaveText('This todo is not done');

    await page.screenshot({ path: 'screenshot-complete00.png' });

    // Complete a first todo in the list.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByTestId('todo-complete-button').click();

    await expect(page.getByTestId('todo-title')).toHaveText([todoItems[0]]);
    await expect(page.getByTestId('todo-status')).toHaveText(['This todo is done']);
    await page.screenshot({ path: 'screenshot-complete02.png' });
  });

  test('Archive a TODO', async ({ page }) => {
    const todoItems = [
      'TODO to archive',
    ];
    
    // Create a TODO from UI
    await page.goto('/');

    await page.getByRole('textbox').fill(todoItems[0]);
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByTestId('todo-title')).toHaveText([todoItems[0]]);
    await expect(page.getByTestId('todo-status')).toHaveText('This todo is not done');

    await page.screenshot({ path: 'screenshot-archive00.png' });

    // Complete a first todo in the list.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByTestId('todo-archive-button').click();

    const todosAtEnd = page.getByTestId('todo-item');
    await expect(todosAtEnd).toHaveCount(0);
    await page.screenshot({ path: 'screenshot-archive02.png' });
  });

  test('Rename a TODO', async ({ page }) => {
    const todoItems = [
      'Original TODO title'
    ];
    
    // Create a TODO from UI
    await page.goto('/');

    await page.getByRole('textbox').fill(todoItems[0]);
    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByTestId('todo-title')).toHaveText([todoItems[0]]);
    await expect(page.getByTestId('todo-status')).toHaveText('This todo is not done');

    await page.screenshot({ path: 'screenshot-rename00.png' });

    // Rename a first todo in the list.
    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByTestId('todo-rename-button').click();
    await firstTodo.getByTestId('todo-edit-input').fill('Changed TODO title');
    await firstTodo.getByTestId('todo-save-button').click();

    await expect(page.getByTestId('todo-title')).toHaveText(['Changed TODO title']);
    await expect(page.getByTestId('todo-status')).toHaveText(['This todo is not done']);
    await page.screenshot({ path: 'screenshot-rename02.png' });
  });

});