# Evolutive-neural-networks
An experiment on artificial evolution of neural networks

https://morpheox.github.io/Evolutive-neural-networks/

The neurons do not output an usual 1 or 0 signal, it uses a custom implementation in wich each neuron fires a multiplier of all its inputs.

For a high number of hidden layers, a function its needed to soften the outputs.

This custom analogic implementation works well for a more natural and chaotic movement.

The organisms have more than 20 inputs neurons, and 3 outputs neurons, this outputs are x movement, y movement, and suction.

Positive suction will get extract energy from green pellets and give out energy to red pellets, and negative suction will give out energy to green pellets and extract energy from red pellets, so an organism can specialize in either type of food and avoid the other, or learn to modify its output depending on the type of food its absorbing.

The neurons.js file can be used on any project and the number of inputs, hidden layers, outputs etc.. can be easily modified.

Note that this is an old experiment, so the code its not very efficient.


