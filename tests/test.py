import unittest

from operations import addition, maximum, format_nom


class TestOperations(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(addition(2, 3), 5)
        self.assertEqual(addition(-1, 1), 0)

    def test_maximum(self):
        self.assertEqual(maximum([1, 5, 3, 2]), 5)
        self.assertEqual(maximum([-10, -3, -7]), -3)
        self.assertIsNone(maximum([]))

    def test_format_nom(self):
        self.assertEqual(format_nom("Jouvence", "akode"), "Jouvence AKODE")
        self.assertEqual(format_nom("  aureol ", " kingston "), "Auréol KINGSTON")


if __name__ == "__main__":
    unittest.main()

