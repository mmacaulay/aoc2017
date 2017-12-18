#include <stdlib.h>
#include "stack.h"

basic_stack_t *create_stack(unsigned max_size) {
  basic_stack_t *stack = (basic_stack_t *)malloc(sizeof(basic_stack_t));
  stack->top = -1;
  stack->data = (char *)malloc(max_size * sizeof(char));
  stack->max_size = max_size;

  return stack;
}

void stack_push(basic_stack_t *stack, char c) {
  stack->data[++stack->top] = c;
}

char stack_pop(basic_stack_t *stack) {
  return stack->data[stack->top--];
}

char stack_peek(basic_stack_t *stack) {
  return stack->data[stack->top];
}