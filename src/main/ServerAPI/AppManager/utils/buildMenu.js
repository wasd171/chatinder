// @flow
import { app, Menu } from 'electron'
import openAboutWindow from 'about-window'
import { resolveRoot } from 'shared/utils'

export function buildMenu() {
	if (process.env.NODE_ENV !== 'development') {
		const template = [
			{
				label: app.getName(),
				submenu: [
					{
						label: 'About',
						click: () => {
							openAboutWindow({
								icon_path: require.resolve(
									'@root/icons/icon.png'
								),
								package_json_dir: resolveRoot(),
								bug_report_url: 'https://github.com/wasd171/chatinder/issues',
								homepage: 'https://github.com/wasd171/chatinder',
								use_inner_html: true,
								adjust_window_size: true,
								copyright: `
                            <p style="text-align: center;line-height: 1.5;">
                                Created by Konstantin Nesterov (<a class="link" style="text-decoration: none;" href='https://github.com/wasd171'>wasd171</a>)
                                <br>
                                Application logo by Liubov Ruseeva
                                <br>
                                Emoji icons supplied by EmojiOne
                                <br>
                                Distributed under MIT license
                            </p>
                        `
							})
						}
					},
					{
						type: 'separator'
					},
					{
						role: 'quit'
					}
				]
			},
			{
				label: 'Edit',
				submenu: [
					{
						role: 'undo'
					},
					{
						role: 'redo'
					},
					{
						type: 'separator'
					},
					{
						role: 'cut'
					},
					{
						role: 'copy'
					},
					{
						role: 'paste'
					}
				]
			}
		]

		Menu.setApplicationMenu(Menu.buildFromTemplate(template))
	}
}
