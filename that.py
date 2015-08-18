import sys
from collections import deque

class thatParser(object):
    def __init__(self):
        self.BEGIN = ('this!', 'this?')
        self.END = ('this?', 'this!')
        self.primitives = {('this.', 'this.'): 'inc',
                           ('this!', 'this!'): 'dec',
                           ('this.', 'this?'): 'right',
                           ('this?', 'this.'): 'left',
                           ('this!', 'this.'): 'write',
                           ('this.', 'this!'): 'read'}
                           
    def parse(self, input_text):
        items = input_text.lower().split()
        for i in range(0, len(items), 2):
            x = (items[i], items[i+1])
            if x in self.primitives or x in (self.BEGIN, self.END):
                yield x
                
class Interpreter(object):
    MAX_NESTED_LOOPS = 1000
    def __init__(self):
        self.that_parser = thatParser()
        self.set_parser(self.that_parser)

    def reset(self):
        self.cells = deque([0])
        self.index = 0
        self.input_buffer = []
        self.output_buffer = []
        self.open_loops = 0
        self.loop = []

    def inc(self):
        self.cells[self.index] += 1

    def dec(self):
        self.cells[self.index] -= 1

    def right(self):
        self.index += 1
        if self.index >= len(self.cells):
            self.cells.append(0)

    def left(self):
        if self.index == 0:
            self.cells.appendleft(0)
        else:
            self.index -= 1

    def write(self):
        self.output_buffer.append(self.cells[self.index])
            
    def read(self):
        try:
            self.cells[self.index] = int(raw_input("Your input: "))
        except (TypeError, ValueError):
            print "oops"

    def as_ascii(self):
        return "".join([chr(c) for c in self.output_buffer])

    def set_parser(self, parser):
        self.parser = parser
        self.reset()

    def interpret_raw_text(self, text):
        self.input_buffer.extend(self.parser.parse(text))
        try:
            self.interpret_items(self.input_buffer)
            self.input_buffer = []
        except IndexError:
            print "oops"

    def interpret_items(self, items):
        for item in items:
            if self.open_loops:
                self.interpret_inside_loop(item)
            else:
                self.interpret_directly(item)

    def interpret_inside_loop(self, item):
        if item == self.parser.END:
            self.open_loops -= 1
            if self.open_loops == 0:
                while self.cells[self.index]:
                    self.interpret_items(self.loop)
                return
        elif item == self.parser.BEGIN:
                self.open_loops += 1
        self.loop.append(item)

    def interpret_directly(self, item):
        if item == self.parser.END:
            raise ValueError("End without begin")
        elif item == self.parser.BEGIN:
            self.open_loops = 1
            self.loop = []
        elif item in self.parser.primitives:
            method = self.parser.primitives[item]
            getattr(self, method)()
        else:
            print "Unknown token '%s' - ignored" % (item, )

    def interpret_file(self, fname):
        file = open(fname, 'r')
        self.interpret_raw_text(file.read())

    def __repr__(self):
        rep = "\n".join(["ASCII output\t: %s"])

        return rep % (self.as_ascii())

def print_usage():
    print "\nUsage:"
    print "Interpret That file: python that.py <FILENAME>\n"


if __name__ == '__main__':
    if len(sys.argv) == 2:
        that = Interpreter()
        that.interpret_file(sys.argv[1])
        print that
    else:
        print_usage()
