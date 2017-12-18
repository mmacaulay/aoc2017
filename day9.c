#include <stdio.h>
#include <stdbool.h>
#include "stack.h"

static int BUFFER_SIZE = 15000;

int group_score(char *stream) {
  basic_stack_t *stack = create_stack(BUFFER_SIZE);
  char *c = stream;
  unsigned score = 0;
  unsigned depth = 0;
  bool garbage = false;
  bool cancel = false;

  while(*c) {
    if (cancel) {
      cancel = false;
    } else {
      switch (*c) {
        case '!':
          cancel = true;
          break;
        case '<':
          garbage = true;
          break;
        case '>':
          garbage = false;
          break;
        case '{':
          if (garbage) break;
          stack_push(stack, '{');
          depth++;
          break;
        case '}':
          if (garbage) break;
          if (stack_peek(stack) == '{') {
            stack_pop(stack);
            score += depth;
            depth--;
          }
          break;
        default:
          break;
      }
    }
    c++;
  }

  return score;
}

void tests() {
  printf("[stream] {}: expected: 1, actual: %d\n", group_score("{}"));
  printf("[stream] {{{}}}: expected: 6, actual: %d\n", group_score("{{{}}}"));
  printf("[stream] {{},{}}: expected: 5, actual: %d\n", group_score("{{},{}}"));
  printf("[stream] {{{},{},{{}}}}: expected: 16, actual: %d\n", group_score("{{{},{},{{}}}}"));

  printf("[stream]: {<a>,<a>,<a>,<a>}: expected: 1, actual: %d\n", group_score("{<a>,<a>,<a>,<a>}"));
  printf("[stream]: {{<ab>},{<ab>},{<ab>},{<ab>}}: expected: 9, actual: %d\n", group_score("{{<ab>},{<ab>},{<ab>},{<ab>}}"));
  printf("[stream]: {{<!!>},{<!!>},{<!!>},{<!!>}}: expected: 9, actual: %d\n", group_score("{{<!!>},{<!!>},{<!!>},{<!!>}}"));
  printf("[stream]: {{<a!>},{<a!>},{<a!>},{<ab>}}: expected: 3, actual: %d\n", group_score("{{<a!>},{<a!>},{<a!>},{<ab>}}"));
}

void real_data() {
  FILE *fp = fopen("day9.txt", "r");
  char data[BUFFER_SIZE];
  fgets(data, BUFFER_SIZE, fp);
  fclose(fp);

  printf("Real data:\n\n");
  printf("[stream]: %d\n", group_score(data));
}

int main() {
 tests();
 real_data();
 return 0;
}

