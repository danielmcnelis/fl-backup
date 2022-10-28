
import {Player} from '../../../models/src/lib/Player'

const fn = async () => {
    const players= await Player.findAll()
}

fn()