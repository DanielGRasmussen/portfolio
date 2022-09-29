#include <iostream>
#include <string>
#include <list>
#include <random>
using namespace std; // Means I don't have to do std:: before half of everything.

class Guessing_Game {
    public:
        bool guessing = true;
        int number = 0;
        int lowest = 0;
        int highest = 0;

        int start_game() {
            /* Starts the game and makes it play. */
            int turns = 0;

            intro();
            randomize();

            int user;
            while (guessing) {
                user = guess();
                check(user);
                turns++;
            }

            cout << "\nCongratulations! You guessed the number!" << endl;
            return turns;
        }

        void intro() {
            /* Introduces the game to the player */
            cout << "\n\nWelcome to the number guessing game!\n" << endl;

            while (highest - lowest < 10) {
                lowest = askint("What would you like the lowest number possible to be? ");
                highest = askint("What would you like the highest number possible to be? ");

                if (lowest > highest) {
                    cout << "\nThe lowest number has to be lower than the highest number.\n" << endl;
                } else if (highest - lowest < 10) {
                    cout << "\nIt has to have at least a difference of 10 between the two numbers.\n" << endl;
                }
            }
        }

        int askint(string question) {
            /* Asks a question and makes sure the question is an int.
             *
             * Arguments:
             *     question (string): The question to ask.
             */
            int guess;

            cout << question;
            cin >> guess; // Grabs input from user (but sends no text)
            while(cin.fail()) {
                cout << "\nSorry it has to be just a number.\n" << endl;
                cin.clear(); // These 2 lines make future stuff actually work if invalid input.
                cin.ignore(256,'\n');
                cout << question;
                cin >> guess;
            }

            return guess;
        }

        void randomize() {
            /* Creates the random number based off of class variables. */
            random_device rd; // Obtains a random number from hardware.
            mt19937 gen(rd()); // Seeds the generator.
            uniform_int_distribution<> distr(lowest, highest); // Defines the range.
            
            number = distr(gen);
        }

        int guess() {
            /* Tells the player what the highest/lowest is and has the player guess with some checking to make sure it is between those numbers.
             *
             * Returns:
             *     int: The guess the player makes.
             */
            int user;
            cout << "\nThe lowest guessed so far is: " + to_string(lowest) << endl;
            cout << "The highest guessed so far is: " + to_string(highest) << endl;

            user = askint("\nGuess: ");

            while (user < lowest || user > highest) {
                if (user < lowest) {
                    cout << "\nYour guess has to be higher than the lowest guess." << endl;
                } else if (user > highest) {
                    cout << "\nYour guess has to be lower than the highest guess." << endl;
                }

                user = askint("\nGuess: ");
            }
            return user;
        }

        void check(int user) {
            /* Checks to see where the number is in correlation the number the player is guessing and updates highest/lowest.
             *
             * Args:
             *     guess (int): The players current guess.
             */
            if (number == user) {
                guessing = false;
            } else if (number > user) {
                cout << "It's higher than that!" << endl;
                lowest = user;
            } else {
                cout << "It's lower than that!" << endl;
                highest = user;
            }
        }

        void reset() {
            guessing = true;
            number = 0;
            lowest = 0;
            highest = 0;
        }
};

int main() {
    Guessing_Game guessing;
    bool playing = true;
    string ask;
    list<int> record;
    list<int>::iterator it;


    while (playing) {
        record.push_back(guessing.start_game());

        cout << "Turns taken history:"; // Goes through game history and prints it.
        for (it = record.begin(); it != record.end(); it++)
            cout << " " << * it;
        cout << "\n";

        cout << "\nWould you like to play again? (y/n) ";
        cin >> ask;

        if (ask == "y") {
            guessing.reset();
        } else {
            playing = false;
        }
    }
    return 0;
}