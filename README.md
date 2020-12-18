# parse4Dcode
` (4D-Component 4Dv18R4/R5) `

parse4Dcode (get only idented tags inner the methods codes without any UI)

## [Component method `getParseResult4DCode`](https://github.com/lveith/parse4Dcode/blob/main/Documentation/Methods/getParseResult4DCode.md)
Get results from any single 4D-Code-Source.<br>
Uses javascript in a hidden webarea/form/window just for to can execute javascript commands.
This needs a start and kill of the window session ([see examples in md-docu](https://github.com/lveith/parse4Dcode/blob/main/Documentation/Methods/getParseResult4DCode.md)).
Normally you start one time, using it multible times and just when no longer needed you can kill it.<br>
*Is still until today generally not thread-safe designed.*

## [Component method `getParseResult4DCodeSumOff`](https://github.com/lveith/parse4Dcode/blob/main/Documentation/Methods/getParseResult4DCodeSumOff.md)
Get results from all Methods/Classes in HostStruct<br>
Plus includes callees and callers of all project-methods.<br>
Uses javascript in a "WA Run offscreen area" just for to can execute javascript commands.
When you need results from hundretThousand method-codes it makes sense to use "WA Run offscreen area" and give this one temporary wa-session one big job to get all results back in one. It is not important that for this bigResult you pay extra time less than one second for just to establish the whole session until ready. But when you need seperate calls for each method-src thousand times, it is not acceptable to start for each method one new session with "WA Run offscreen area".
This is the reason why two ways here are offered, `getParseResult4DCode` and `getParseResult4DCodeSumOff`.<br>
*Is still until today generally not thread-safe designed.*
