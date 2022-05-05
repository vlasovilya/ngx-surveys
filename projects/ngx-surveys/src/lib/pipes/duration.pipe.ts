import {Pipe, PipeTransform} from '@angular/core';
//import moment from 'moment';

@Pipe({
    name: 'duration',
    pure: true,
})
export class DurationPipe implements PipeTransform {


  transform(value: any, ...args: string[]): string {
    if (typeof args === 'undefined' || !args.length) {
      throw new Error('DurationPipe: missing required time unit argument');
    }
    const arr=new Date(value * 1000).toISOString().substr(11, 8).split(':');
    const duration = {
        days: 0,
        hours: parseInt(arr[0]),
        minutes: parseInt(arr[1]),
        seconds: parseInt(arr[2]),
    }
    const formats={
      short: {
        d: 'd',
        h: 'h',
        m: 'm',
        s: 's',
      },
      long: {
        d: ' days',
        h: ' hrs',
        m: ' mins',
        s: ' secs',
      }
    }
    const f=args[1] || 'short';
    return args[0]==='seconds'
      ? (duration.days ? duration.days + formats[f].d+' ' : '') + (duration.hours ? duration.hours + formats[f].h+' ' : '') + (duration.minutes ? duration.minutes + formats[f].m+' ' : '') + duration.seconds + formats[f].s
      : arr.join(':')

  }
}
