import {Command, flags} from '@oclif/command'
// @ts-ignore
import hexToHsl from 'hex-to-hsl'
//@ts-ignore
import * as generate from 'lyft-coloralgorithm'

// steps - number of steps to generate
// lum_curve
// sat_curve
// hue_curve
// lum_start
// lum_end
// sat_start
// sat_end
// sat_rate
// hue_start - Colour
// hue_end - Colour
// modifier

export default class Generate extends Command {
  static description = 'generate a series of colour steps'

  static flags = {
    start: flags.string({description: 'start hex value'}),
    end: flags.string({description: 'end hex value'}),
    steps: flags.integer({char: 's', description: 'number of colours to generate'}),
  }

  async run() {
    const {flags} = this.parse(Generate)
    const startHSL = hexToHsl(flags.start)
    const endHSL = hexToHsl(flags.end)

    const algorithmArguments = {
      steps: flags.steps,
      lum_start: startHSL[2],
      lum_end: endHSL[2],
      sat_start: startHSL[1],
      sat_end: endHSL[1],
      hue_start: startHSL[0],
      hue_end: endHSL[0],
      hue_curve: 'easeInQuad',
      lum_curve: 'easeOutQuad',
      sat_curve: 'easeOutQuad',
      modifier: 10,
      graph: 'sat',
    }

    const colourSequence = generate({specs: algorithmArguments})
    this.log(colourSequence)
  }
}
