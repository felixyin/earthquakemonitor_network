/**
 * Created by fy on 20/04/2017.
 */

export default class DeployPointVO {
    constructor (data) {
        this.id = data.id || ''
        this.audio_wav_count = data.audio_wav_count || ''
        this.audio_wav_intensity = data.audio_wav_intensity || ''
        this.city_name = data.city_name || ''
        this.com = data.com || ''
        this.company_name = data.company_name || ''
        this.hello_screen_show_time = data.hello_screen_show_time || ''
        this.is_loop_for_test = data.is_loop_for_test || ''
        this.is_play_audio = data.is_play_audio || ''
        this.is_play_count_down = data.is_play_count_down || ''
        this.is_production_version = data.is_production_version || ''
        this.is_show_light = data.is_show_light || ''
        this.latitude = data.latitude || ''
        this.longitude = data.longitude || ''
        this.screensaver_show_after = data.screensaver_show_after || ''
        this.switch_screensaver_timer = data.switch_screensaver_timer || ''
        this.test_first_time = data.test_first_time || ''
        this.test_time = data.test_time || ''
    }
}
