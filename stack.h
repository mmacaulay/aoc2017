#ifndef STACK_H
#define STACK_H

typedef struct stack {
  int top;
  char *data;
  unsigned max_size;
} basic_stack_t;

basic_stack_t *create_stack(unsigned max_size);
void stack_push(basic_stack_t *stack, char c);
char stack_pop(basic_stack_t *stack);
char stack_peek(basic_stack_t *stack);

#endif